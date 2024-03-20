/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MemoType } from '../models/MemoType';
import type { PaymentAsset } from '../models/PaymentAsset';
import type { QuoteResponse } from '../models/QuoteResponse';
import type { SinkingResponse } from '../models/SinkingResponse';
import type { VcsProject } from '../models/VcsProject';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CarbonService {

    /**
     * Get a quote of the current CARBON price in USD.
     * Request a price quote for any amount of CARBON.
     *
     * The response includes the total cost of the requested amount, as well as the average price
     * per CARBON. Both are denominated in USD.
     *
     * This quote is non-binding and does not take into account the amount of CARBON that we are
     * currently able to provide from our pool.
     * @returns QuoteResponse Successful Response
     * @throws ApiError
     */
    public static getCarbonQuoteCarbonQuoteGet({
        carbonAmount,
    }: {
        /**
         * requested amount of CARBON
         */
        carbonAmount?: (number | string),
    }): CancelablePromise<QuoteResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/carbon-quote',
            query: {
                'carbon_amount': carbonAmount,
            },
            errors: {
                400: `Horizon transaction has failed or is malformed`,
                410: `Data requested from Horizon is before recorded history`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
                503: `Horizon's historical database is too stale`,
                504: `Horizon could not confirm transaction inclusion (check network conditions)`,
            },
        });
    }

    /**
     * Build the XDR for a new CARBON sinking transaction.
     * An offset is done by atomically swapping CARBON for CarbonSINK. This endpoint can be used to
     * build the XDR for such a sinking transaction.
     *
     * If the funder does not have a sufficient balance of CARBON, a path payment will be used to
     * purchase the exact amount of CARBON to be retired. The most favorable rate will be selected
     * from the possible paths. The USDC value of this payment is included in the response for
     * convenience, but it is advisable to always check the generated XDR before signing and
     * submitting it to the network.
     * @returns SinkingResponse Successful Response
     * @throws ApiError
     */
    public static buildSinkCarbonXdrSinkCarbonXdrPost({
        funder,
        recipient,
        carbonAmount,
        paymentAsset,
        vcsProjectId,
        memoType,
        memoValue,
        email,
    }: {
        /**
         * public key of the account that pays for the transaction
         */
        funder: string,
        /**
         * public key of the account that will receive CarbonSINK (default: funder)
         */
        recipient?: (string | null),
        /**
         * the amount of CARBON to sink
         */
        carbonAmount?: (number | string),
        /**
         * the preferred asset to pay with when the funder does not have a sufficient CARBON balance
         */
        paymentAsset?: (PaymentAsset | null),
        /**
         * carbon project from which credits will be retired
         */
        vcsProjectId?: (VcsProject | null),
        /**
         * the kind of memo that will be attached to the transaction
         */
        memoType?: (MemoType | null),
        /**
         * description of the reason for offsetting
         */
        memoValue?: (string | null),
        /**
         * email address that will receive the Verra certificate (also supports `Your Name <account@domain.xyz>` format)
         */
        email?: (string | null),
    }): CancelablePromise<SinkingResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sink-carbon/xdr',
            query: {
                'funder': funder,
                'recipient': recipient,
                'carbon_amount': carbonAmount,
                'payment_asset': paymentAsset,
                'vcs_project_id': vcsProjectId,
                'memo_type': memoType,
                'memo_value': memoValue,
                'email': email,
            },
            errors: {
                400: `No payment path was found for this Stellar account`,
                404: `Stellar account was not found on the Public Global Stellar Network`,
                410: `Data requested from Horizon is before recorded history`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
                503: `Horizon's historical database is too stale`,
                504: `Horizon could not confirm transaction inclusion (check network conditions)`,
            },
        });
    }

}
