import Tags from "./src/tags/tags.ts";
import TagsItem from "./src/tags-item/tags-item.ts";

export default function (App) {
    App.component(Tags.name, Tags);
    App.component(TagsItem.name, TagsItem);
}