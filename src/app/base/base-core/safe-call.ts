
export function safeCall(it: any, action: (it) => any): any {
  
    if (it) return action(it);
}


/*
export function safeCallNovo(it: any, action: (it) => any): any {
  
//    console.log('it ', it);
    if (!(it=[]) &&   (it)) return action(it);    
    
}
*/


export function safeCallOrNull(it: any, action: (it) => any, actionElse: () => void ): any {
    if (it) return action(it);
    else return  actionElse();
}

/**
 * 
 * @param it type param for return context
 * @param action for result context 
 */
export function withCall(it: any, action: (it) => any): any {
    return action(it);
} 