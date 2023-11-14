import React from "react";
import { Button, notification, Space } from "antd";

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const Notification: React.FC = () :any => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <div className='loader bw bg-green-600'>
          <div className='ping-wave' />
        </div>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" color="green" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: close,
    });
  };

  return {openNotification,contextHolder};
};

export default Notification;
