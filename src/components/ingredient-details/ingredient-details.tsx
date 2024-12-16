import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import { getIngredientById } from '@selectors';

export const IngredientDetails: FC = () => {
  const id = useParams<{ id: string }>().id;
  if (!id) {
    return <Preloader />;
  }

  const ingredientData = useSelector(getIngredientById(id));
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
