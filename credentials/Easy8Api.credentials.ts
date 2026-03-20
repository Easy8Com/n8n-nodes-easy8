import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class Easy8Api implements ICredentialType {
  name = 'easy8Api';

  icon = {
    light: 'file:Easy8.svg',
    dark: 'file:Easy8.dark.svg',
  } as const;

  displayName = 'Easy8 API';
  documentationUrl = 'https://easyredmine.com/documentation/';

  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'token',
      type: 'string',
      default: '',
      typeOptions: {
        password: true,
      },
    },
    {
      displayName: 'Domain',
      name: 'domain',
      type: 'string',
      default: '',
    },
  ];

  // This allows the credential to be used by other parts of n8n
  // stating how this credential is injected as part of the request
  // An example is the Http Request node that can make generic calls
  // reusing this credential
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-Redmine-API-Key': '={{$credentials.token}}',
      },
    },
  };

  // The block below tells how this credential can be tested
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.domain}}',
      url: '/issues.json',
    },
  };
}
