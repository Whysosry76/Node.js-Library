const querystring = require('querystring');
const BaseChainComponent = require('./base-chain-component');

class BaseWallet extends BaseChainComponent {

    /**
     * Create Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to create a new wallet.
     *
     * @param {string} name - Wallet name.
     * @param {Array} addresses - Array of addresses that will be added to wallet.
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    createWallet(name, addresses, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            walletName: name,
            addresses: addresses
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets?' + queryString, data);
    }

    /**
     * Create HD Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to create a new HD wallet.
     *
     * @param {string} name - Wallet name.
     * @param {number} addressCount - Number of addresses that should be generated in the new wallet.
     * @param {string} password - Wallet password.
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    createHDWallet(name, addressCount, password, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            walletName: name,
            addressCount: addressCount,
            password: password
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/hd?' + queryString, data);
    }

    /**
     * List Wallets Endpoint
     *
     * @async
     * @desc This endpoint returns a string array of active wallet names under the token you queried. You can then query
     *      detailed information on individual wallets (via their names) by leveraging the Get Wallet Endpoint.
     *
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    listWallets(queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/wallets?' + queryString);
    }

    /**
     * List HD Wallets Endpoint
     *
     * @async
     * @desc This endpoint returns a string array of active wallet names under the token you queried. You can then query
     *      detailed information on individual wallets (via their names) by leveraging the Get Wallet Endpoint.
     *
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    listHDWallets(queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/wallets/hd?' + queryString);
    }

    /**
     * Get Wallet Endpoint
     *
     * @async
     * @desc This endpoint returns a Wallet.
     *
     * @param {string} walletName - Wallet name.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    getWallet(walletName, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/wallets/' + walletName + '?' + queryString);
    }

    /**
     * Get HD Wallet Endpoint
     *
     * @async
     * @desc This endpoint returns a HD Wallet.
     *
     * @param {string} walletName - Wallet name.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    getHDWallet(walletName, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/wallets/hd/' + walletName + '?' + queryString);
    }

    /**
     * Add Addresses to Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to add public addresses to the wallet, by POSTing a partially filled out Wallet
     *      object. You only need to include the additional addresses in a new addresses array in the object. If
     *      successful, it will return the newly modified Wallet, including an up-to-date, complete listing of addresses.
     *
     * @param {string} name - Wallet name.
     * @param {Array} addresses - Array of addresses that will be added to wallet.
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    addAddressToWallet(name, addresses, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            addresses: addresses
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/' + name + '/addresses?' + queryString, data);
    }

    /**
     * Generate Address in Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to generate a new address associated with the wallet, similar to the Generate
     *      Address Endpoint. If successful, it will returned the newly modified Wallet.
     *
     * @param {string} name - Wallet name.
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    generateAddressInWallet(name, optData = {}, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/' + name + '/addresses/generate?' + queryString, optData);
    }

    /**
     * Generate Address in HD Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to generate a new address associated with the wallet, similar to the Generate
     *      Address Endpoint. If successful, it will returned the newly modified Wallet.
     *
     * @param {string} name - Wallet name.
     * @param {number} addressCount - Number of addresses that should be generated in the wallet.
     * @param {string} password - Wallet password.
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    generateAddressInHDWallet(name, addressCount, password, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            addressCount: addressCount,
            password: password
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/hd/' + name + '/addresses/generate?' + queryString, data);
    }

    /**
     * Remove Addresses from Wallet Endpoint
     *
     * @async
     * @desc This endpoint allows you to delete an address associated with the wallet.
     *
     * @param {string} name - Wallet name.
     * @param {string} address - Address which should be deleted.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    removeAddressFromWallet(name, address, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.delete(this.basePath + this.getSelectedNetwork() + '/wallets/' + name + '/address/' + address + '?' + queryString);
    }

    /**
     * Delete Wallet Endpoint
     *
     * @async
     * @desc This endpoint deletes the Wallet.
     *
     * @param {string} name - Wallet name.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    deleteWallet(name, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.delete(this.basePath + this.getSelectedNetwork() + '/wallets/' + name + '?' + queryString);
    }

    /**
     * Delete HD Wallet Endpoint
     *
     * @async
     * @desc This endpoint deletes the HD Wallet.
     *
     * @param {string} name - Wallet name.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    deleteHDWallet(name, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.delete(this.basePath + this.getSelectedNetwork() + '/wallets/hd/' + name + '?' + queryString);
    }

    /**
     * Create XPub Endpoint
     *
     * @async
     * @desc Create XPub Endpoint allows you to create a random extended public key (based on your password), xpriv and wif.
     *
     * @param {string} password
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    createXPub(password, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            password: password
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/hd/xpub?' + queryString, data);
    }

    /**
     * Get XPub Change Addresses Endpoint
     *
     * @async
     * @desc Get XPub Change Addresses Endpoint allows you to get the change(KeyPurpose: Change) addresses associated
     *      with the specified xpub. Since those are hierarchically ordered we provide the arguments from and to - both
     *      integeres, in order to be able to get the addresses in the specific positions. If you request, e.g. "from": 0
     *      and "to": 50, this will return the first 50 change addresses linked to the specified xpub.
     *
     * @param {string} xpub
     * @param {number} from
     * @param {number} to
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    getXPubChangeAddresses(xpub, from, to, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            xpub: xpub,
            from: from,
            to: to
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/hd/xpub/addresses/change?' + queryString, data);
    }

    /**
     * Get XPub Receive Addresses Endpoint
     *
     * @async
     * @desc Get XPub receive Addresses Endpoint allows you to get the receive(KeyPurpose: RECEIVE_FUNDS) addresses
     *      associated with the specified xpub. Since those are hierarchically ordered we provide the arguments from and
     *      to - both integeres, in order to be able to get the addresses in the specific positions. If you request,
     *      e.g. "from": 0 and "to": 50, this will return the first 50 receive addresses linked to the specified xpub.
     *
     * @param {string} xpub
     * @param {number} from
     * @param {number} to
     * @param {object} [optData] - Optional data.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    getXPubReceiveAddresses(xpub, from, to, optData = {}, queryParams = {}) {
        let data = {};

        Object.keys(optData).map(k => {
            data[k] = optData[k];
        });

        data = {
            ...data,
            xpub: xpub,
            from: from,
            to: to
        };

        const queryString = querystring.stringify(queryParams);

        return this.request.post(this.basePath + this.getSelectedNetwork() + '/wallets/hd/xpub/addresses/receive?' + queryString, data);
    }

}

module.exports = BaseWallet;