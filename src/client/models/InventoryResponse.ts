/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditBatch } from './CreditBatch';

export type InventoryResponse = {
    total_inventory_credits: number;
    credit_batches: Array<CreditBatch>;
};

