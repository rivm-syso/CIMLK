// @ts-check
/**
 * Sets the defaults for W3C specs
 */
export const name = "w3c/defaults";
import {
  W3CNotes,
  bgStatus,
  cgStatus,
  recTrackStatus,
  registryTrackStatus,
  status2text,
  tagStatus,
  trStatus,
} from "./headers.js";
import { codedJoinOr, docLink, showError } from "../core/utils.js";
import { coreDefaults } from "../core/defaults.js";

const w3cLogo = {
  src: "https://www.w3.org/StyleSheets/TR/2021/logos/W3C",
  alt: "W3C",
  height: 48,
  width: 72,
  url: "https://www.w3.org/",
};

const memSubmissionLogo = {
  alt: "W3C Member Submission",
  href: "https://www.w3.org/Submission/",
  src: "https://www.w3.org/Icons/member_subm-v.svg",
  width: "211",
  height: "48",
};

const w3cDefaults = {
  lint: {
    "privsec-section": false,
    "required-sections": true,
    "wpt-tests-exist": false,
    "informative-dfn": "warn",
    "no-unused-dfns": "warn",
    a11y: false,
  },
  doJsonLd: false,
  logos: [],
  xref: true,
  wgId: "",
  otherLinks: [],
  excludeGithubLinks: true,
  subtitle: "",
  prevVersion: "",
  formerEditors: [],
  editors: [],
  authors: [],
};

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...w3cDefaults.lint,
          ...conf.lint,
        };

  Object.assign(conf, {
    ...coreDefaults,
    ...w3cDefaults,
    ...conf,
    lint,
  });

  if (conf.specStatus !== "unofficial" && !conf.hasOwnProperty("license")) {
    conf.license = "w3c-software-doc";
  }

  processLogos(conf);
}

function processLogos(conf) {
  // Primarily include the W3C logo and license for W3C Recommendation track
  // that have an actual working group.
  const { specStatus, wg } = conf;
  const isWgStatus = [
    ...recTrackStatus,
    ...registryTrackStatus,
    ...W3CNotes,
    ...tagStatus,
    "ED",
  ].includes(specStatus);
  const inWorkingGroup = wg && wg.length && isWgStatus;
  // Member submissions don't need to be in a Working Group.
  const doesNotNeedWG = ["Member-SUBM"].includes(specStatus);
  const canShowW3CLogo = inWorkingGroup || doesNotNeedWG;
  if (canShowW3CLogo) {
    conf.logos.unshift(w3cLogo);
    if (specStatus === "Member-SUBM") {
      conf.logos.push(memSubmissionLogo);
    }
  }
}