import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MetricoolApi implements ICredentialType {
	name = 'metricoolApi';

	displayName = 'Metricool API';

	documentationUrl = 'https://app.metricool.com/api';

	properties: INodeProperties[] = [
		{
			displayName: 'User Token',
			name: 'userToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Unique authorization code found in Account Settings > API section',
			required: true,
		},
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			description: 'The user identifier of your Metricool account',
			required: true,
		},
		{
			displayName: 'Blog ID (Brand ID)',
			name: 'blogId',
			type: 'string',
			default: '',
			description: 'The identification number of the brand (can be found in the browser URL)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Mc-Auth': '={{$credentials.userToken}}',
			},
			qs: {
				userId: '={{$credentials.userId}}',
				blogId: '={{$credentials.blogId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.metricool.com/api',
			url: '/admin/simpleProfiles',
			method: 'GET',
		},
	};
}
