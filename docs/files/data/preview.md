# Preview

The `<n-preview>` component family is used to display file previews for various file types. It supports images, videos, and other file formats with appropriate renderings and includes lightbox functionality for expanded viewing.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    previewBinds: {
        preview: true,
        showSrc: true
    },
    previewImage: 'https://github.com/vankizmann/coloa/blob/main/demo/test.jpg?raw=true',
    previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    previewDocument: 'document.pdf'
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Preview">
                <n-switch v-model="previewBinds.preview">Enable lightbox</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Show Source">
                <n-switch v-model="previewBinds.showSrc">Show file source</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Image Preview (Contain)</h3>
            </div>
            <div class="col--auto">
                <n-preview style="width: 400px; height: 300px;" v-bind="previewBinds" :file="previewImage" fit="contain"></n-preview>
            </div>
            <div class="col--1-1">
                <h3>Video Preview (Cover)</h3>
            </div>
            <div class="col--auto">
                <n-preview style="width: 400px; height: 300px;" v-bind="previewBinds" :thumb="previewImage" :file="previewVideo"></n-preview>
            </div>
            <div class="col--1-1">
                <h3>Plain Preview</h3>
            </div>
            <div class="col--auto">
                <n-preview style="width: 400px; height: 300px;" v-bind="previewBinds" :file="previewDocument"></n-preview>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Preview

| **Prop**      | **Type**       | **Default** | **Description**                                                             |
|---------------|----------------|-----------|-----------------------------------------------------------------------------|
| `file`        | `Any`          | `null`    | The file to preview (URL, File object, or Blob).                            |
| `thumb`       | `Any`          | `null`    | Optional thumbnail to use instead of the file for preview.                  |
| `fit`         | `String`       | `'cover'` | How the preview content should fit its container ('cover', 'contain', 'fill'). |
| `mime`        | `String`       | `null`    | Force a specific MIME type for the preview.                                 |
| `preview`     | `Boolean`      | `true`    | If true, enables lightbox functionality on click.                           |
| `showSrc`     | `Boolean`      | `true`    | If true, shows the source path for non-image files.                         |
| `map`         | `Object`       | `{...}`   | Maps file extensions to MIME types for preview rendering.                   |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `getFileMime()`       | Determines the MIME type of the current file.                        |
| `getThumbMime()`      | Determines the MIME type of the thumbnail.                           |
| `showLightbox()`      | Opens the lightbox to show the full preview.                         |

<hr>

## Preview Image

| **Prop**      | **Type**       | **Default**                  | **Description**                                                             |
|---------------|----------------|------------------------------|-----------------------------------------------------------------------------|
| `src`         | `Any`          | `null`                       | The image source (URL, File object, or Blob).                               |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `resolveLoad()`       | Handles the image loading process.                                   |
| `resolveData()`       | Converts File or Blob objects to data URLs for display.              |

<hr>

## Preview Video

| **Prop**      | **Type**       | **Default**                  | **Description**                                                             |
|---------------|----------------|------------------------------|-----------------------------------------------------------------------------|
| `src`         | `Any`          | `null`                       | The video source (URL, File object, or Blob).                               |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `resolveType()`       | Determines the video type and provider.                              |
| `resolveYoutube()`    | Extracts YouTube video ID from URLs.                                 |
| `resolveVimeo()`      | Extracts Vimeo video ID from URLs.                                   |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `resolve:youtube`     | Emitted when a YouTube video is resolved with the video ID.          |
| `resolve:vimeo`       | Emitted when a Vimeo video is resolved with the video ID.            |

<hr>

## Preview Plain

| **Prop**      | **Type**       | **Default**                  | **Description**                                                             |
|---------------|----------------|------------------------------|-----------------------------------------------------------------------------|
| `src`         | `Any`          | `null`                       | The file source (URL, File object, or Blob).                                |
| `type`        | `String`       | `null`                       | The file type to display.                                                   |
| `showSrc`     | `Boolean`      | `true`                       | If true, shows the source path or filename.                                 |