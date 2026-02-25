import Tags from "./src/tags/tags.jsx";
import TagsItem from "./src/tags-item/tags-item.jsx";

export default function (App) {
    App.component(Tags.name, Tags);
    App.component(TagsItem.name, TagsItem);
}