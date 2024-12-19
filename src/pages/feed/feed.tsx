import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  getFeed,
  getFeedLoadingStatusSelector,
  getOrdersSelector
} from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedLoaded = useSelector(getFeedLoadingStatusSelector);
  const orders: TOrder[] = useSelector(getOrdersSelector);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length || feedLoaded) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
