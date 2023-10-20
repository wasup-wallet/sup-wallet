// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Wasup {
    // variables

    struct User {
        string phonenumber;
        address wallet;
        uint256 balance;
    }
    mapping(string => User) usersMap;

    // functions

    /**
     * Create account
     * @param phonenumber of user
     * @param wallet created for this user
     */
    function createAccount(string memory phonenumber, address wallet) public {
        User memory newUser = User({
            phonenumber: phonenumber,
            wallet: wallet,
            balance: 0
        });
        usersMap[phonenumber] = newUser;
    }

    /**
     * Get adress from phonenumber
     * @param phonenumber of user
     * return wallet address
     */
    function getAddress(string memory phonenumber) public view returns (address) {
        return usersMap[phonenumber].wallet;
    }

    /**
     * Get balance
     * @param phonenumber of user
     * return current balance
     */
    function getBalance(string memory phonenumber) public view returns (uint256) {
        return usersMap[phonenumber].balance;
    }

    /**
     * Update balance
     * @param phonenumber of user
     * @param amount current balance received
     */
    function updateBalance(string memory phonenumber, uint256 amount) public {
        usersMap[phonenumber].balance = amount;
    }
}