import { Group } from '@antv/g';
import { Axis } from '../../../../src/ui/axis';
import { data } from '../../utils';

export const AxisArcTitle1 = () => {
  const group = new Group({
    style: { width: 400, height: 300 },
  });

  group.appendChild(
    new Axis({
      style: {
        data: data(8),
        type: 'arc',
        radius: 80,
        titleText: 'title',
        lineLineWidth: 5,
        titleFill: 'red',
        titleFontSize: 16,
        titleFontWeight: 'bold',
        titleSpacing: 10,
        tickLength: 10,
        labelSpacing: 15,
        startAngle: -90,
        endAngle: 270,
        center: [150, 150],
        titleTransform: 'translate(100%, 0)',
      },
    })
  );

  return group;
};

AxisArcTitle1.tags = ['极坐标系', '标题', '左下'];
