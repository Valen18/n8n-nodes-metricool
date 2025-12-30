# Vuela AI Node for n8n

## Overview

The Vuela AI Node is a community node for n8n that provides integration with the Vuela.ai API for generating AI-powered content and videos. This node enables users to create engaging content, videos, and manage projects using artificial intelligence.

**Created by:** VA360.pro  
**Version:** 0.1.0  
**Node Type:** Community Node

## Architecture

The node uses a modular architecture to ensure maintainability and prevent code corruption:

```
nodes/Vuela/
├── Vuela.node.ts          # Main node class (34 lines)
├── Vuela.node.json        # Node configuration and metadata
├── VuelaDescription.ts    # Node description and properties
├── VuelaExecutor.ts       # Execution logic
├── vuela.svg              # Node icon
├── properties/            # Modular properties by resource
│   ├── authProperties.ts
│   ├── contentProperties.ts
│   ├── videoProperties.ts  # (18KB - extensive video parameters)
│   └── projectProperties.ts
└── utils/
    └── apiHelpers.ts      # API request helpers
credentials/
└── VuelaApi.credentials.ts # API credentials configuration
package.json               # Package configuration and dependencies
index.js                   # Entry point for n8n
tsconfig.json              # TypeScript configuration
.eslintrc.js               # ESLint configuration
scripts/                   # Build and deployment scripts
└── post-build.js          # Post-build processing
```

## Installation

1. Copy the node files to your n8n community nodes directory:
   ```powershell
   xcopy "d:\Test\n8n-nodes-vuela\*" "D:\n8n\mis-nodos\n8n-nodes-vuela\" /E /I /Y
   ```

2. Restart n8n to load the new node

3. The node will appear in the n8n interface under "Vuela AI"

## Authentication

The node requires API key authentication:

1. **Create Credentials:**
   - Go to n8n Settings → Credentials
   - Create new credential of type "Vuela API"
   - Enter your Vuela.ai API key

2. **API Key Setup:**
   - Obtain your API key from Vuela.ai platform
   - Configure the credential in n8n
   - Assign the credential to the Vuela AI node

## Resources and Operations

The node supports four main resources:

### 1. Authentication (`auth`)
Test and validate API credentials.

#### Operations:
- **Validate Token** (`validateToken`): Validates API key and connection

### 2. Content (`content`)
Generate and manage AI-powered content.

#### Operations:
- **Generate Article** (`generateArticle`): Create AI-generated article content
- **Get Content** (`get`): Retrieve specific content by ID
- **List Contents** (`getMany`): Get multiple content items

#### Parameters:
- **Title**: Title of the article to generate (required for generateArticle)
- **Content ID**: ID of the content to retrieve (required for get operation)

### 3. Video (`video`)
Create and manage AI-generated videos.

#### Operations:
- **Generate Video** (`generate`): Create AI-powered videos
- **Get Video** (`get`): Retrieve specific video by ID
- **List Videos** (`getMany`): Get multiple video items

#### Parameters:
- **Video Type**: Type of video to create
  - `single_voice`: Simple video with one narrator
  - `scenes`: Multi-character video with scenes
  - `avatar`: Video with AI avatar presenter
- **Script**: Video script content
- **Language**: Video language
- **Voice Settings**: Voice configuration for narration

### 4. Project (`project`)
Manage projects and organize content.

#### Operations:
- **Get Project** (`get`): Retrieve specific project
- **List Projects** (`getMany`): Get multiple projects

#### Parameters:
- **Project ID**: ID of the project to retrieve (required for get operation)

## Parameter Details

### Common Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `resource` | Options | Yes | Resource type (auth, content, video, project) |
| `operation` | Options | Yes | Operation to perform |

### Content Generation Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | String | Yes | Title of the article to generate |
| `contentId` | String | Yes (for get) | ID of the content to retrieve |

### Video Generation Parameters

#### Core Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mode` | Options | Yes | Video mode: `single_voice`, `scenes`, `avatar` |
| `video_script` | String | Yes | Script content (use \n for line breaks) |
| `quality_tier` | Options | No | Quality: `basic`, `premium` (default: premium) |
| `language` | Options | No | Language selection from 14 supported languages (default: English) |
| `country` | Options | No | Country selection from 20+ supported countries (default: US) |
| `aspect_ratio` | Options | Yes | Ratio: `16:9` (landscape), `9:16` (portrait) |
| `animation_type` | Options | Yes | Animation: `moving_image`, `ai_video` |

#### Voice Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `voice_id` | Options | Conditional | Voice selection from 20+ predefined voices or custom (required for single_voice/avatar modes) |
| `custom_voice_id` | String | Conditional | Custom voice ID when "Custom Voice ID" is selected |
| `voice_style` | Options | No | Style: `narrative`, `expressive`, `dynamic` |
| `voice_speed` | Options | No | Speed: `standard`, `fast`, `very_fast` |
| `voices` | Array | Conditional | Character voice mapping (required for scenes mode) |

#### Media & Style Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `media_type` | Options | Conditional | Media: `ai_image`, `google_image`, `custom_image` |
| `style` | Options | Conditional | Visual style (35+ options: photorealistic, anime, 3d, etc.) |
| `style_id` | String | Conditional | Custom style ID (premium only) |
| `images_per_minute` | Number | No | Images per minute (8-40, default: 8) |
| `custom_images_urls` | Array | Conditional | Custom image URLs (required for custom_image) |

#### Avatar Parameters (Avatar Mode)
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `avatar_id` | Options | Yes | Avatar selection from 10+ predefined avatars or custom |
| `custom_avatar_id` | String | Conditional | Custom avatar ID when "Custom Avatar ID" is selected |
| `avatar_layout` | Options | Yes | Layout: `full_screen`, `combined` |
| `avatar_layout_style` | Options | Conditional | Style: `split_screen`, `overlay`, `overlay_corner`, `presentation` |
| `avatar_layout_options` | Object | Conditional | Layout options (perspective, background_id) |

#### Subtitle Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `add_subtitles` | Boolean | No | Enable subtitles (default: false) |
| `caption_font` | Options | Conditional | Font selection from 15+ popular fonts or custom |
| `caption_font_url` | String | Conditional | Custom font URL when "Custom Font URL" is selected |
| `caption_alignment` | Options | Conditional | Alignment: `top`, `middle`, `bottom`, etc. |
| `subtitle_highlight_color` | Options | No | 31 color options for highlighting |
| `subtitle_stroke_width` | Options | No | Stroke: Hidden, Light, Standard, Heavy |
| `subtitle_highlight_mode` | Options | Conditional | Mode: `background`, `text` |

#### Background Music Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `add_background_music` | Boolean | No | Enable background music (default: false) |
| `background_music_id` | Options | Conditional | Music selection from 15+ categorized tracks or custom |
| `custom_background_music_id` | String | Conditional | Custom music ID when "Custom Music ID" is selected |

### Query Parameters (for List Operations)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `returnAll` | Boolean | No | Return all items (default: false) |
| `limit` | Number | No | Maximum items to return (default: 10) |

## Usage Examples

### Example 1: Generate Article
```json
{
  "resource": "content",
  "operation": "generateArticle",
  "title": "Benefits of AI in Business"
}
```

### Example 2: Generate Single Voice Video
```json
{
  "resource": "video",
  "operation": "generate",
  "mode": "single_voice",
  "video_script": "Today we're exploring healthy breakfast ideas that can boost your energy levels throughout the day.\nFirst, let's talk about overnight oats - a simple solution that you can prepare the night before.\nNext, we have avocado toast with a poached egg - a perfect balance of healthy fats and protein.",
  "language": "en",
  "country": "US",
  "aspect_ratio": "16:9",
  "voice_id": "21m00Tcm4TlvDq8ikWAM",
  "voice_style": "narrative",
  "voice_speed": "standard",
  "media_type": "ai_image",
  "quality_tier": "premium",
  "style": "photorealistic",
  "animation_type": "moving_image",
  "images_per_minute": 10,
  "add_subtitles": true,
  "caption_font": "Roboto",
  "caption_alignment": "bottom",
  "subtitle_highlight_color": "blue",
  "subtitle_highlight_mode": "background"
}
```

### Example 3: Generate Multi-Character Scene Video
```json
{
  "resource": "video",
  "operation": "generate",
  "mode": "scenes",
  "video_script": "[characters]\nHOST: Energetic and cheerful presenter who guides the audience through the cooking process with enthusiasm.\nGUEST: Calm and knowledgeable chef who shares practical tips and culinary expertise.\n[end]\n[scene: Kitchen setup]\nHOST: Welcome to our cooking show!\nGUEST: Today we'll be making pancakes.\nHOST: Let's start with the ingredients.\nGUEST: You'll need flour, eggs, milk, and a pinch of salt.\n[end]",
  "language": "en",
  "country": "US",
  "aspect_ratio": "16:9",
  "voices": [
    {
      "character": "HOST",
      "voice_id": "GwtqU7RCQKrjzJ0dGhqT"
    },
    {
      "character": "GUEST",
      "voice_id": "X9WGBPgSR2u10TfJQU8R"
    }
  ],
  "media_type": "ai_image",
  "quality_tier": "premium",
  "style": "photorealistic",
  "animation_type": "moving_image",
  "add_subtitles": true,
  "caption_font": "Roboto",
  "caption_alignment": "bottom"
}
```

### Example 4: Generate Avatar Video
```json
{
  "resource": "video",
  "operation": "generate",
  "mode": "avatar",
  "video_script": "Space exploration has fascinated humanity for centuries. From the first telescopes to modern space stations, we've made remarkable progress.\nToday, we're looking at the future of interplanetary travel and what it means for humanity.",
  "language": "en",
  "country": "US",
  "aspect_ratio": "9:16",
  "voice_id": "21m00Tcm4TlvDq8ikWAM",
  "voice_style": "expressive",
  "avatar_id": "0448fe9021354d0fad4ef130",
  "avatar_layout": "combined",
  "avatar_layout_style": "split_screen",
  "media_type": "ai_image",
  "style": "photorealistic",
  "animation_type": "moving_image",
  "add_subtitles": true,
  "add_background_music": true,
  "background_music_id": "music_track_123"
}
```

### Example 3: Validate Token
```json
{
  "resource": "auth",
  "operation": "validateToken"
}
```

## API Endpoints

The node connects to the following Vuela.ai API endpoints:

- **Base URL**: `https://api.vuela.ai`
- **Authentication**: API Key in header
- **Content Type**: `application/json`

### Endpoint Mapping

| Resource | Operation | Method | Endpoint |
|----------|-----------|---------|----------|
| Auth | Validate Token | POST | `/generate/validate-token` |
| Content | Generate Article | POST | `/generate/article` |
| Content | Get | GET | `/my-content/{id}` |
| Content | List | GET | `/my-content` |
| Video | Generate | POST | `/generate/video` |
| Video | Get | GET | `/my-videos/{id}` |
| Video | List | GET | `/my-videos` |
| Project | Get | GET | `/my-projects/{id}` |
| Project | List | GET | `/my-projects` |

## Error Handling

The node includes comprehensive error handling:

- **Authentication Errors**: Invalid API key or expired credentials
- **Rate Limiting**: API rate limit exceeded
- **Validation Errors**: Invalid parameters or missing required fields
- **Network Errors**: Connection issues or timeouts
- **Server Errors**: Vuela.ai service unavailable

### Error Response Format
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## Configuration Files

### Node Configuration (`Vuela.node.json`)
Defines node metadata, categories, and documentation resources:
- **Categories**: "Marketing & Content", "Artificial Intelligence"
- **Documentation URLs**: Links to Vuela.ai docs and VA360.pro tutorials
- **Aliases**: Alternative search terms for the node

### Package Configuration (`package.json`)
- **Version**: 0.1.0
- **Keywords**: n8n-community-node-package, vuela, ai, content-generation, video-generation
- **Author**: Valen - VA360.pro
- **Repository**: GitHub repository for the node
- **Scripts**: Build, development, linting, and formatting commands

### TypeScript Configuration (`tsconfig.json`)
Configures TypeScript compilation for the node with n8n-specific settings.

### ESLint Configuration (`.eslintrc.js`)
Code quality and style enforcement with n8n-nodes-base plugin.

## Development

### Building the Node
```bash
npm run build
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Node Not Appearing in n8n**
   - Ensure files are in correct directory
   - Restart n8n service
   - Check n8n logs for errors

2. **Authentication Failures**
   - Verify API key is correct
   - Check credential configuration
   - Test connection using auth resource

3. **API Errors**
   - Check Vuela.ai service status
   - Verify API endpoints are accessible
   - Review request parameters

4. **Build Errors**
   - Run `npm install` to install dependencies
   - Check TypeScript compilation errors
   - Verify import paths are correct

### Debug Mode

Enable debug mode in n8n to see detailed logs:
```bash
N8N_LOG_LEVEL=debug npm start
```

## Support

For issues and support:
- Check the n8n community forum
- Review Vuela.ai documentation
- Contact VA360.pro for node-specific issues

## About the Creator

**Valen** - Creador de contenido especializado en IA y automatizaciones

- 🐦 **Twitter**: [@Valen](https://twitter.com/Valen)
- 📸 **Instagram**: [@valentin_ayesa](https://instagram.com/valentin_ayesa)
- 🌐 **Website**: [VA360.pro](https://va360.pro)
- 💼 **LinkedIn**: [Valentín Ayesa](https://linkedin.com/in/valentin-ayesa)

### 🎓 Learn More

¿Quieres aprender a crear tus propios nodos de n8n como este? 

**[Únete a VA360.pro](https://va360.pro)** - La mayor comunidad de IA y automatizaciones en español donde encontrarás:

- 📚 Tutoriales paso a paso
- 🤝 Comunidad activa de automatizadores
- 🎯 Casos de uso reales
- 🚀 Las últimas novedades en IA
- 💡 Soporte directo de expertos

## Acknowledgments

- [Vuela.ai](https://vuela.ai) por proporcionar la increíble API de IA
- [n8n](https://n8n.io) por la fantástica plataforma de automatización
- La comunidad de [VA360.pro](https://va360.pro) por el feedback y soporte

## Changelog

### Version 0.1.0
- Initial release
- Modular architecture implementation
- Support for article generation and video generation
- Authentication token validation
- Project listing and retrieval
- Comprehensive video generation with 35+ visual styles
- Enhanced UX with dropdown selections for major parameters
- Custom options for advanced users
- Avatar, scenes, and single-voice video modes
- Subtitle and background music support
- Comprehensive error handling

## License

This community node is provided as-is. Please refer to the Vuela.ai terms of service for API usage guidelines.

---

**Note**: This node is a community contribution and is not officially supported by n8n or Vuela.ai. Use at your own discretion and ensure compliance with both platforms' terms of service.
