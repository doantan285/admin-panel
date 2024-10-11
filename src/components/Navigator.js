import React from 'react';
import { Button } from '@shopify/polaris';
import {
  HomeFilledIcon,
  OrderFilledIcon,
  SettingsFilledIcon
} from '@shopify/polaris-icons';

const Navigator = () => {
  return (
    <div className="w-52 bg-gray-200 p-4 h-full">
      <div className="flex flex-col h-full justify-between">
        <div className="pt-10">
          <Button
            variant="tertiary"
            icon={HomeFilledIcon}
            url='/dashboard'
          >
            Dashboard
          </Button>
          <Button
            variant="tertiary"
            icon={OrderFilledIcon}
            url='/products'
          >
            Products
          </Button>
        </div>
        <div className='self-start'>
          <Button
            variant="tertiary"
            icon={SettingsFilledIcon}
            url='/settings'
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigator;
