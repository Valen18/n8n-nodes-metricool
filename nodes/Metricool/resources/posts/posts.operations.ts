import type { INodeProperties } from 'n8n-workflow';

const resource = ['post'];

export const postOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource,
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a scheduled post',
				description: 'Create a new scheduled post',
				routing: {
					request: {
						method: 'POST',
						url: '/v2/scheduler/posts',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get scheduled posts',
				description: 'Get scheduled posts between two dates',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/scheduler/posts',
					},
				},
			},
		],
		default: 'getMany',
	},
];

// Fields for Get Many operation
const getManyFields: INodeProperties[] = [
	{
		displayName: 'Start Date',
		name: 'start',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['getMany'],
			},
		},
		description: 'The start date from which to return posts (e.g., 2024-12-03T10:15:30)',
		routing: {
			send: {
				type: 'query',
				property: 'start',
				value: '={{ $value.replace("Z", "") }}',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'end',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['getMany'],
			},
		},
		description: 'The end date until which to return posts (e.g., 2024-12-04T10:15:30)',
		routing: {
			send: {
				type: 'query',
				property: 'end',
				value: '={{ $value.replace("Z", "") }}',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: 'Europe/Madrid',
				description: 'The timezone in which to return the posts (e.g., Europe/Madrid)',
				routing: {
					send: {
						type: 'query',
						property: 'timezone',
					},
				},
			},
			{
				displayName: 'Extended Range',
				name: 'extendedRange',
				type: 'boolean',
				default: false,
				description: 'Whether to expand search date range by one day before and after to avoid timezone issues',
				routing: {
					send: {
						type: 'query',
						property: 'extendedRange',
						value: '={{ $value.toString() }}',
					},
				},
			},
		],
	},
];

// Fields for Create operation
const createFields: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
			},
		},
		description: 'The text content of the post',
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
	{
		displayName: 'Publication Date',
		name: 'publicationDateTime',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
			},
		},
		description: 'The date and time when the post should be published',
	},
	{
		displayName: 'Timezone',
		name: 'timezone',
		type: 'string',
		default: 'Europe/Madrid',
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
			},
		},
		description: 'Timezone for the publication date (e.g., Europe/Madrid, America/New_York)',
		routing: {
			send: {
				type: 'body',
				property: 'publicationDate',
				value: '={{ { "dateTime": $parameter.publicationDateTime.replace("Z", ""), "timezone": $value } }}',
			},
		},
	},
	{
		displayName: 'Networks',
		name: 'networks',
		type: 'multiOptions',
		options: [
			{ name: 'Bluesky', value: 'bluesky' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Google Business', value: 'gmb' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'Pinterest', value: 'pinterest' },
			{ name: 'Threads', value: 'threads' },
			{ name: 'TikTok', value: 'tiktok' },
			{ name: 'Twitter/X', value: 'twitter' },
			{ name: 'YouTube', value: 'youtube' },
		],
		default: [],
		required: true,
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
			},
		},
		description: 'The social networks where the post will be published',
		routing: {
			send: {
				type: 'body',
				property: 'providers',
				value: '={{ $value.map(network => ({ "network": network })) }}',
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Auto Publish',
				name: 'autoPublish',
				type: 'boolean',
				default: true,
				description: 'Whether to automatically publish the post',
				routing: {
					send: {
						type: 'body',
						property: 'autoPublish',
					},
				},
			},
			{
				displayName: 'Draft',
				name: 'draft',
				type: 'boolean',
				default: false,
				description: 'Whether to save as draft',
				routing: {
					send: {
						type: 'body',
						property: 'draft',
					},
				},
			},
			{
				displayName: 'First Comment Text',
				name: 'firstCommentText',
				type: 'string',
				default: '',
				description: 'Text for the first comment (useful for Instagram hashtags)',
				routing: {
					send: {
						type: 'body',
						property: 'firstCommentText',
					},
				},
			},
			{
				displayName: 'Media URLs',
				name: 'media',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'URLs of media files to attach to the post. Note: You may need to use the normalize/image/url endpoint first for external URLs.',
				routing: {
					send: {
						type: 'body',
						property: 'media',
					},
				},
			},
			{
				displayName: 'Media Alt Text',
				name: 'mediaAltText',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Alt text for each media file (in the same order as media URLs)',
				routing: {
					send: {
						type: 'body',
						property: 'mediaAltText',
					},
				},
			},
			{
				displayName: 'Save External Media Files',
				name: 'saveExternalMediaFiles',
				type: 'boolean',
				default: false,
				description: 'Whether to save a copy of external media files on Metricool servers',
				routing: {
					send: {
						type: 'body',
						property: 'saveExternalMediaFiles',
					},
				},
			},
			{
				displayName: 'Shortener',
				name: 'shortener',
				type: 'boolean',
				default: false,
				description: 'Whether to shorten URLs in the post',
				routing: {
					send: {
						type: 'body',
						property: 'shortener',
					},
				},
			},
		],
	},
	// Facebook specific options
	{
		displayName: 'Facebook Options',
		name: 'facebookOptions',
		type: 'collection',
		placeholder: 'Add Facebook Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['facebook'],
			},
		},
		options: [
			{
				displayName: 'Post Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Post', value: 'POST' },
					{ name: 'Reel', value: 'REEL' },
					{ name: 'Story', value: 'STORY' },
				],
				default: 'POST',
				description: 'The type of Facebook post',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'facebookData',
				value: '={{ $value }}',
			},
		},
	},
	// Instagram specific options
	{
		displayName: 'Instagram Options',
		name: 'instagramOptions',
		type: 'collection',
		placeholder: 'Add Instagram Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['instagram'],
			},
		},
		options: [
			{
				displayName: 'Auto Publish',
				name: 'autoPublish',
				type: 'boolean',
				default: true,
				description: 'Whether to auto-publish on Instagram',
			},
			{
				displayName: 'Post Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Post', value: 'POST' },
					{ name: 'Reel', value: 'REEL' },
					{ name: 'Story', value: 'STORY' },
					{ name: 'Carousel', value: 'CAROUSEL' },
				],
				default: 'POST',
				description: 'The type of Instagram post',
			},
			{
				displayName: 'Show Reels In Feed',
				name: 'showReelsInFeed',
				type: 'boolean',
				default: true,
				description: 'Whether to show reels in the feed',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'instagramData',
				value: '={{ $value }}',
			},
		},
	},
	// Twitter specific options
	{
		displayName: 'Twitter/X Options',
		name: 'twitterOptions',
		type: 'collection',
		placeholder: 'Add Twitter Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['twitter'],
			},
		},
		options: [
			{
				displayName: 'Reply Settings',
				name: 'replySettings',
				type: 'options',
				options: [
					{ name: 'Everyone', value: 'EVERYONE' },
					{ name: 'Following', value: 'FOLLOWING' },
					{ name: 'Mentioned Users', value: 'MENTIONED_USERS' },
				],
				default: 'EVERYONE',
				description: 'Who can reply to this tweet',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'twitterData',
				value: '={{ $value }}',
			},
		},
	},
	// LinkedIn specific options
	{
		displayName: 'LinkedIn Options',
		name: 'linkedinOptions',
		type: 'collection',
		placeholder: 'Add LinkedIn Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['linkedin'],
			},
		},
		options: [
			{
				displayName: 'Post Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Post', value: 'POST' },
					{ name: 'Document', value: 'DOCUMENT' },
				],
				default: 'POST',
				description: 'The type of LinkedIn post',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'linkedinData',
				value: '={{ $value }}',
			},
		},
	},
	// TikTok specific options
	{
		displayName: 'TikTok Options',
		name: 'tiktokOptions',
		type: 'collection',
		placeholder: 'Add TikTok Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['tiktok'],
			},
		},
		options: [
			{
				displayName: 'Disable Comments',
				name: 'disableComments',
				type: 'boolean',
				default: false,
				description: 'Whether to disable comments on the video',
			},
			{
				displayName: 'Disable Duet',
				name: 'disableDuet',
				type: 'boolean',
				default: false,
				description: 'Whether to disable duet for the video',
			},
			{
				displayName: 'Disable Stitch',
				name: 'disableStitch',
				type: 'boolean',
				default: false,
				description: 'Whether to disable stitch for the video',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'tiktokData',
				value: '={{ $value }}',
			},
		},
	},
	// YouTube specific options
	{
		displayName: 'YouTube Options',
		name: 'youtubeOptions',
		type: 'collection',
		placeholder: 'Add YouTube Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['youtube'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the YouTube video',
			},
			{
				displayName: 'Privacy',
				name: 'privacy',
				type: 'options',
				options: [
					{ name: 'Public', value: 'PUBLIC' },
					{ name: 'Private', value: 'PRIVATE' },
					{ name: 'Unlisted', value: 'UNLISTED' },
				],
				default: 'PUBLIC',
				description: 'The privacy setting for the video',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'The category ID for the video',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Tags for the video',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'youtubeData',
				value: '={{ $value }}',
			},
		},
	},
	// Pinterest specific options
	{
		displayName: 'Pinterest Options',
		name: 'pinterestOptions',
		type: 'collection',
		placeholder: 'Add Pinterest Option',
		default: {},
		displayOptions: {
			show: {
				resource,
				operation: ['create'],
				networks: ['pinterest'],
			},
		},
		options: [
			{
				displayName: 'Board ID',
				name: 'boardId',
				type: 'string',
				default: '',
				description: 'The ID of the Pinterest board',
			},
			{
				displayName: 'Link',
				name: 'link',
				type: 'string',
				default: '',
				description: 'The destination link for the pin',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the pin',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'pinterestData',
				value: '={{ $value }}',
			},
		},
	},
];

export const postFields: INodeProperties[] = [
	...getManyFields,
	...createFields,
];
