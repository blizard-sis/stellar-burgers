import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  getConstructorItemsSelector,
  getConstructorStateSelector,
  getIsAuthorizedSelector,
  sendOrder,
  setOrderRequest
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getIsAuthorizedSelector);
  const constructorItems = useSelector(getConstructorItemsSelector);
  const constructorState = useSelector(getConstructorStateSelector);
  const orderRequest = constructorState.orderRequest;
  const orderModalData = constructorState.orderModalData;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthorized && constructorItems.bun) navigate('/login');
    dispatch(setOrderRequest(true));
    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ];
    dispatch(sendOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
