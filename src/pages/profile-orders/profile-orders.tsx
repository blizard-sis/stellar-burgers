import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch } from '@store';
import { useSelector } from 'react-redux';
import {
  getFeedLoadingStatusSelector,
  getOrdersSelector,
  getProfileFeed
} from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getFeedLoadingStatusSelector);
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getProfileFeed());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
