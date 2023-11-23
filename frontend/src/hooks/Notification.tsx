import React from "react";
import { Button, Divider, Space, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

const Notification: React.FC = () :any => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: '',
      placement,
    });
  };


  return {openNotification,contextHolder};
};

export default Notification;
