import React from "react";
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { SmileOutlined } from '@ant-design/icons';

type NotificationFuncType = {
  openNotification: (placement: NotificationPlacement,message?:string) => void,
  contextHolder:React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

function useNotificationHook() : NotificationFuncType {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement,message?:string) => {
        api.info({
            message:message || 'Someone just joined.Start convertation',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            placement:placement
        });
    };


  return {
    openNotification:openNotification,
    contextHolder:contextHolder
  }
};

export default useNotificationHook;
