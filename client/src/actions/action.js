import { FETCH_BUDGET, CURRENT_BUDGET } from '../constants.js';
import axios from 'axios';

export const fetchBudget = () => {
  return {
    type: FETCH_BUDGET,

  }
}

export const currentBudget
