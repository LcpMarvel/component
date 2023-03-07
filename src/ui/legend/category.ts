import { GUI } from '../../core';
import type { Group } from '../../shapes';
import { BBox, select, Selection, splitStyle, subStyleProps } from '../../util';
import { getBBox, Title, type TitleStyleProps } from '../title';
import { CategoryItems } from './category/items';
import { CATEGORY_DEFAULT_OPTIONS, CLASS_NAMES } from './constant';
import type { CategoryOptions, CategoryStyleProps } from './types';

export type { CategoryOptions, CategoryStyleProps };

export class Category extends GUI<CategoryStyleProps> {
  constructor(options: CategoryOptions) {
    super(options, CATEGORY_DEFAULT_OPTIONS);
  }

  private titleGroup!: Selection;

  private title!: Selection<Title>;

  private itemsGroup!: Selection;

  private items!: Selection<CategoryItems>;

  private renderTitle(container: Selection, width: number, height: number) {
    const { showTitle, titleText } = this.attributes;
    const style = subStyleProps<TitleStyleProps>(this.attributes, 'title');
    const [titleStyle, groupStyle] = splitStyle(style);

    this.titleGroup = container.maybeAppendByClassName<Group>(CLASS_NAMES.titleGroup, 'g').styles(groupStyle);

    const finalTitleStyle = { width, height, ...titleStyle, text: showTitle ? titleText : '' };
    this.title = this.titleGroup
      .maybeAppendByClassName(CLASS_NAMES.title, () => new Title({ style: finalTitleStyle as TitleStyleProps }))
      .update(finalTitleStyle) as Selection<Title>;
  }

  private renderItems(container: Selection, bbox: DOMRect) {
    const { x, y, width, height } = bbox;
    const { style, ...restAttr } = subStyleProps(this.attributes, 'title', true);
    const [partialItemStyle, groupStyle] = splitStyle(style);
    // overwrite width and height to available space
    // overwrite x and y to 0
    const itemStyle = { ...restAttr, ...partialItemStyle, width, height, x: 0, y: 0 };
    this.itemsGroup = container
      .maybeAppendByClassName<Group>(CLASS_NAMES.itemsGroup, 'g')
      .styles({ x, y, ...groupStyle });

    this.items = this.itemsGroup
      .maybeAppendByClassName(CLASS_NAMES.items, () => new CategoryItems({ style: { data: [] } }))
      .update(itemStyle) as Selection<CategoryItems>;
  }

  private adjustLayout() {
    const { showTitle } = this.attributes;
    if (showTitle) {
      const { x, y } = this.title.node<Title>().getAvailableSpace();
      this.itemsGroup.node().setLocalPosition(x, y);
    }
  }

  private get availableSpace(): DOMRect {
    const { showTitle, width, height } = this.attributes;
    if (!showTitle) return new BBox(0, 0, width!, height!);
    return (this.title.node() as Title).getAvailableSpace();
  }

  public getBBox(): DOMRect {
    return getBBox(this.title.node(), this.items.node());
  }

  render(attributes: Required<CategoryStyleProps>, container: Group) {
    const { width, height } = attributes;
    const ctn = select(container);

    this.renderTitle(ctn, width!, height!);

    this.renderItems(ctn, this.availableSpace);

    this.adjustLayout();
  }
}
