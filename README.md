# **release-notes-generator**

FORK
---
This is fork of the package already included in semantic-release. The reason we created this fork is to allow custom extension that can alter the parsed commits. 

One of the use cases we created this fork is to link JIRA service desk ticket to the commit based on the internal JIRA-ticket. 
To use this [extension](https://github.com/Cube-Solutions/release-notes-generator-jira-linked-ticket-extension), make sure you install the package and add it to the configuration. 

```javascript
{
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      }
    ],
    [
      'release-notes-generator-extension',
      {
        preset: 'conventionalcommits',
        extensions: [
          {
            name: 'release-notes-generator-jira-linked-ticket-extension',
            config: {
              issuePrefixTopics: [
                'ML-',
                'MLSD-'
              ],
              issuePrefixMatches: [
                'MLSD-'
              ]
            }
          }
        ],
        issuePrefixes: [
          'ML-',
          'MLSD-'
        ],
        commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
        compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/-/compare/{{previousTag}}...{{currentTag}}',
        issueUrlFormat: 'https://YOUR_JIRA_HOST/browse/{{prefix}}{{id}}'
      }
    ],
  ]
}
```

For other configuration options view the original package: [**semantic-release**](https://github.com/semantic-release/semantic-release)
