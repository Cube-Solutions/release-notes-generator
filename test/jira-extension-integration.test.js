const test = require('ava');

const {generateNotes} = require('..');
const escape = require("escape-string-regexp");

const cwd = process.cwd();
const host = 'https://github.com';
const owner = 'owner';
const repository = 'repo';
const repositoryUrl = `${host}/${owner}/${repository}`;
const lastRelease = {gitTag: 'v1.0.0'};
const nextRelease = {gitTag: 'v2.0.0', version: '2.0.0'};
const jiraHost = process.env.JIRA_HOST
const jiraUsername = process.env.JIRA_USERNAME
const jiraPassword = process.env.JIRA_PASSWORD


test('Applies the jira linked ticket extension', async (t) => {
  const commits = [
    {hash: '111', message: 'fix: ML-1600 First fix'},
  ];

  const changelog = await generateNotes({
    preset: "conventionalcommits",
    extensions: [
      {
        name: "release-notes-generator-jira-linked-ticket-extension",
        config: {
          issuePrefixTopics: [
            "ML-",
            "MLSD-"
          ],
          issuePrefixMatches: [
            "MLSD-",
          ],
        }
      }
    ],
    presetConfig: {
      issuePrefixes: [
        "ML-",
        "MLSD-"
      ],
      commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
      compareUrlFormat: "{{host}}/{{owner}}/{{repository}}/-/compare/{{previousTag}}...{{currentTag}}",
      issueUrlFormat: "https://jira.host.be/browse/{{prefix}}{{id}}"
    }
  }, {
    cwd,
    options: {repositoryUrl},
    lastRelease,
    nextRelease,
    commits,
    env: {JIRA_HOST: jiraHost, JIRA_USERNAME: jiraUsername, JIRA_PASSWORD: jiraPassword},
  });

  t.regex(
    changelog,
    new RegExp(escape('closes [MLSD-654](https://jira.host.be/browse/MLSD-654)\n'))
  );

  console.log(changelog);
});