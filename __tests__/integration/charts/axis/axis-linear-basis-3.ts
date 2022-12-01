import { Group } from '@antv/g';
import { mockData } from '../../utils/mock-data';
import { Axis } from '../../../../src/ui/axis';

export const AxisLinearBasis3 = () => {
  const group = new Group();

  group.appendChild(
    new Axis({
      style: {
        startPos: [50, 100],
        endPos: [450, 500],
        data: mockData,
        lineLineWidth: 5,
        lineStroke: 'orange',
        tickStroke: 'black',
        tickLength: 10,
        tickLineWidth: 5,
        labelDirection: 'negative',
        labelSpacing: 5,
        labelTransform: 'rotate(-45)',

        type: 'linear',
      },
    })
  );

  return group;
};

AxisLinearBasis3.tags = ['笛卡尔坐标系', '倾斜', '正向'];
