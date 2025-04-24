import Tags from './src/tags/tags';
import TagsItem from './src/tags-item/tags-item';

export default function (App) {
    App.component(Tags.name, Tags);
    App.component(TagsItem.name, TagsItem);
}