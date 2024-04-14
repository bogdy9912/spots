#![no_std]

#[allow(unused_imports)]
use multiversx_sc::imports::*;

/// An empty contract. To be used as a template when starting a new contract from scratch.
#[multiversx_sc::contract]
pub trait Spot {

    #[view]
    #[storage_mapper("target")]
    fn target(&self) -> SingleValueMapper<BigUint>;

    #[view]
    #[storage_mapper("currentExpense")]
    fn currentExpense(&self) -> SingleValueMapper<BigUint>;

    #[view(getDeposit)]
    #[storage_mapper("deposit")]
    fn deposit(&self, donor: &ManagedAddress) -> SingleValueMapper<BigUint>;

    #[view(getGroupAddresses)]
    #[storage_mapper("groupAddresses")]
    fn group_addresses(&self) -> UnorderedSetMapper<ManagedAddress>;

    #[init]
    fn init(&self, target: BigUint) {
        self.target().set(&target);
    }

    #[endpoint]
    #[payable("EGLD")]
    fn fund(&self) {
        let payment = self.call_value().egld_value();
        let caller = self.blockchain().get_caller();
        self.deposit(&caller).update(|deposit| *deposit +=  &*payment);

        self.group_addresses().insert(caller.clone());
    }

    
    #[endpoint]
    fn updateExpense(&self, expense: BigUint) {
        require!(expense > 0, "Expense amount must be more than 0");
        self.currentExpense().set(expense);
    }
    #[endpoint]
    fn splitAmount(&self) {
        let mut iter = group_addresses.iter();
        let length = group_addresses.len();
        let balance = self.blockchain().get_balance(self);


        while let Some(item) = iter.next() {
            self.deposit(*item).update(|deposit| *deposit -= balance/length)
            // 'item' is now a reference to the current element
            // You can now use 'item' inside this block
        }
        
    }



    #[upgrade]
    fn upgrade(&self) {}
}
