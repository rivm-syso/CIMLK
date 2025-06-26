// @ts-check
import { ISODate, W3CDate, getIntlData } from "../../core/utils.js";
import { html } from "../../core/import-maps.js";
import showLink from "../../core/templates/show-link.js";
import showLogo from "../../core/templates/show-logo.js";
import showPeople from "../../core/templates/show-people.js";
import { sub } from "../../core/pubsubhub.js";

const localizationStrings = {
  en: {
    archives: "archives",
    author: "Author:",
    authors: "Authors:",
    changelog: "Changelog",
    commit_history: "Commit history",
    edited_in_place: "edited in place",
    editor: "Editor:",
    editors: "Editors:",
    feedback: "Feedback:",
    former_editor: "Former editor:",
    former_editors: "Former editors:",
    history: "History:",
    implementation_report: "Implementation report:",
    latest_editors_draft: "Latest editor's draft:",
    latest_published_version: "Latest published version:",
    latest_recommendation: "Latest Recommendation:",
    message_topic: "… message topic …",
    more_details_about_this_doc: "More details about this document",
    multiple_alternates(plural) {
      return `This document is also available in ${
        plural ? "these non-normative formats" : "this non-normative format"
      }:`;
    },
    prev_editor_draft: "Previous editor's draft:",
    prev_recommendation: "Previous Recommendation:",
    prev_version: "Previous version:",
    publication_history: "Publication history",
    test_suite: "Test suite:",
    this_version: "This version:",
    with_subject_line: "with subject line",
    your_topic_here: "YOUR TOPIC HERE",
  },
  nl: {
    author: "Auteur:",
    authors: "Auteurs:",
    changelog: "Veranderingslogboek",
    editor: "Redacteur:",
    editors: "Redacteurs:",
    latest_editors_draft: "Laatste werkversie:",
    latest_published_version: "Laatst gepubliceerde versie:",
    this_version: "Deze versie:",
    history: "Geschiedenis:",
    commit_history: "Commit-geschiedenis",
    more_details_about_this_doc: "Meer details over dit document",
    feedback: "Wijzigingsverzoeken:",
  },
};
export const l10n = getIntlData(localizationStrings);

export function getSpecSubTitleElem(conf) {
  let specSubTitleElem = document.querySelector("h2#subtitle");

  if (specSubTitleElem && specSubTitleElem.parentElement) {
    specSubTitleElem.remove();
    conf.subtitle = specSubTitleElem.textContent.trim();
  } else if (conf.subtitle) {
    specSubTitleElem = document.createElement("h2");
    specSubTitleElem.textContent = conf.subtitle;
    specSubTitleElem.id = "subtitle";
  }
  if (specSubTitleElem) {
    specSubTitleElem.classList.add("subtitle");
  }
  return specSubTitleElem;
}

export default (conf, options) => {
  /**
   * After export, we let fixup.js handle the <details>.
   */
  sub("beforesave", doc => {
    const details = doc.querySelector(".head details");
    details.open = true;
  });
  return html`<div class="head">
    ${conf.logos.length
      ? html`<p class="logos">${conf.logos.map(showLogo)}</p>`
      : ""}
    ${document.querySelector("h1#title")} ${getSpecSubTitleElem(conf)}
    <p id="w3c-state">${renderSpecTitle(conf)}</p>
    <details open="${localStorage.getItem("tr-metadata") || "true"}">
      <summary>${l10n.more_details_about_this_doc}</summary>
      <dl>
        ${conf.thisVersion
          ? html`<dt>${l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>`
          : ""}
        ${"latestVersion" in conf // latestVersion can be falsy
          ? html`<dt>${l10n.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion
                  ? html`<a href="${conf.latestVersion}"
                      >${conf.latestVersion}</a
                    >`
                  : "none"}
              </dd>`
          : ""}
        ${conf.edDraftURI
          ? html`
              <dt>${l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.historyURI || conf.changelogUri || conf.github
          ? html`<dt>${l10n.history}</dt>
              ${conf.historyURI
                ? html`<dd>
                    <a href="${conf.historyURI}">${conf.historyURI}</a>
                  </dd>`
                : ""}
              ${conf.changelogUri
                ? html`<dd>
                    <a href="${conf.changelogUri}">${l10n.changelog}</a>
                  </dd>` 
                : ""}
              ${conf.github
                ? html`<dd>
                    <a href="${conf.github.commitHistoryURL}"
                      >${l10n.commit_history}</a
                    >
                  </dd>`
                : ""}`
          : ""}
        ${conf.testSuiteURI
          ? html`
              <dt>${l10n.test_suite}</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? html`
              <dt>${l10n.implementation_report}</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.prevED
          ? html`
              <dt>${l10n.prev_editor_draft}</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            `
          : ""}
        ${conf.showPreviousVersion
          ? html`
              <dt>${l10n.prev_version}</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.prevRecURI
          ? ""
          : conf.isRec
          ? html`
              <dt>${l10n.prev_recommendation}</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `
          : html`
              <dt>${l10n.latest_recommendation}</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        ${conf.editors.length
          ? html`
              <dt>${conf.editors.length > 1 ? l10n.editors : l10n.editor}</dt>
              ${showPeople(conf, "editors")}
            `
          : ""}
        ${conf.formerEditors.length
          ? html`
              <dt>
                ${conf.formerEditors.length > 1
                  ? l10n.former_editors
                  : l10n.former_editor}
              </dt>
              ${showPeople(conf, "formerEditors")}
            `
          : ""}
        ${conf.authors.length
          ? html`
              <dt>${conf.authors.length > 1 ? l10n.authors : l10n.author}</dt>
              ${showPeople(conf, "authors")}
            `
          : ""}
        ${conf.github || conf.wgPublicList
          ? html`<dt>${l10n.feedback}</dt>
              ${renderFeedback(conf)}`
          : ""}
        ${conf.errata
          ? html`<dt>Errata:</dt>
              <dd><a href="${conf.errata}">Errata exists</a>.</dd>`
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
    </details>
    ${conf.isRec
      ? html`<p>
          See also
          <a
            href="${`https://www.w3.org/Translations/?technology=${conf.shortName}`}"
          >
            <strong>translations</strong></a
          >.
        </p>`
      : ""}
    ${conf.alternateFormats
      ? html`<p>
          ${l10n.multiple_alternates(options.multipleAlternates)}
          ${options.alternatesHTML}
        </p>`
      : ""}
    ${renderCopyright(conf)}
    <hr title="Separator for header" />
  </div>`;
};

export function renderFeedback(conf) {
  const definitions = [];
  // Github feedback...
  if (conf.github) {
    const { repoURL, issuesURL, newIssuesURL, pullsURL, fullName } =
      conf.github;
    definitions.push(
      html`<dd>
        <a href="${repoURL}">GitHub ${fullName}</a>
        (<a href="${pullsURL}">pull requests</a>,
        <a href="${newIssuesURL}">new issue</a>,
        <a href="${issuesURL}">open issues</a>)
      </dd>`
    );
  }

  // The <a href="mailto:list?subject"> link for the public list
  if (conf.wgPublicList) {
    const mailToURL = new URL(`mailto:${conf.wgPublicList}@w3.org`);
    const subject =
      conf.subjectPrefix ?? `[${conf.shortName}] ${l10n.your_topic_here}`;
    const mailingListLink = html`<a
      href="${mailToURL.href}?subject=${encodeURIComponent(subject)}"
      >${mailToURL.pathname}</a
    >`;

    // The subject line...
    const subjectLine =
      conf.subjectPrefix ||
      html`[${conf.shortName}] <em>${l10n.message_topic}</em>`;
    const emailSubject = html`${l10n.with_subject_line}${" "}
      <kbd>${subjectLine}</kbd>`;

    // Archives link
    const archiveURL = new URL(
      conf.wgPublicList,
      "https://lists.w3.org/Archives/Public/"
    );
    const archiveLink = html`(<a href="${archiveURL}" rel="discussion"
        >${l10n.archives}</a
      >)`;

    definitions.push(
      html`<dd>${mailingListLink} ${emailSubject} ${archiveLink}</dd>`
    );
  }
  return definitions;
}

function renderSpecTitle(conf) {
  const specType = conf.isCR || conf.isCRY ? conf.longStatus : conf.textStatus;
  const preamble = conf.prependW3C
    ? html`<a href="https://www.w3.org/standards/types#${conf.specStatus}"
        >W3C ${specType}</a
      >`
    : html`${specType}`;
  return html`${preamble}${" "}
    <time class="dt-published" datetime="${conf.dashDate}"
      >${W3CDate.format(conf.publishDate)}</time
    >${conf.modificationDate
      ? html`, ${l10n.edited_in_place}${" "}
          <time
            class="dt-modified"
            datetime="${ISODate.format(conf.modificationDate)}"
            >${W3CDate.format(conf.modificationDate)}</time
          >`
      : ""}`;
}

/**
 * @param { LicenseInfo } licenseInfo license information
 */
function linkLicense(licenseInfo) {
  const { url, short, name } = licenseInfo;
  if (name === "unlicensed") {
    return html`. <span class="issue">THIS DOCUMENT IS UNLICENSED</span>.`;
  }
  return html` and
    <a rel="license" href="${url}" title="${name}">${short}</a> rules apply.`;
}

function renderCopyright(conf) {
  // If there is already a copyright, let's relocate it.
  const existingCopyright = document.querySelector(".copyright");
  if (existingCopyright) {
    existingCopyright.remove();
    return existingCopyright;
  }
  if (conf.isUnofficial && conf.licenseInfo) {
    return html`<p class="copyright">
      Copyright &copy;
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      the document editors/authors.
      ${conf.licenseInfo.name !== "unlicensed"
        ? html`Text is available under the
            <a rel="license" href="${conf.licenseInfo.url}"
              >${conf.licenseInfo.name}</a
            >; additional terms may apply.`
        : ""}
    </p>`;
  }
  return renderOfficialCopyright(conf);
}

function renderOfficialCopyright(conf) {
  return html`<p class="copyright">
    <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright"
      >Copyright</a
    >
    &copy;
    ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
    ${conf.additionalCopyrightHolders
      ? html` ${[conf.additionalCopyrightHolders]} &amp; `
      : ""}
    <a href="https://www.w3.org/">World Wide Web Consortium</a>.
    <abbr title="World Wide Web Consortium">W3C</abbr><sup>&reg;</sup>
    <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer"
      >liability</a
    >,
    <a href="https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks"
      >trademark</a
    >${linkLicense(conf.licenseInfo)}
  </p>`;
}
