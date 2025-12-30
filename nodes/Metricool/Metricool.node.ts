import {
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { postOperations, postFields } from './resources/posts';

export class Metricool implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Metricool',
		name: 'metricool',
		icon: 'file:metricool.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Metricool API to manage scheduled posts',
		defaults: {
			name: 'Metricool',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'metricoolApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.metricool.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Post',
						value: 'post',
					},
				],
				default: 'post',
			},
			...postOperations,
			...postFields,
		],
	};
}
