export default class Account {
  #_data = {};

  /**
   * Constructor, can be used for a new account, or for an existing one (if given the emailId) 
   */
  constructor(data){
    if ( ! data ) 
       throw new Error('No email provided')

    if ( data.phone )
      this.phone = data.phone

    this.#_data = data
  }

  /**
   * Retrieve account via email
   * 
   * @param  {string}   email   Email address to search for
   * @return {Account}          Instance of Account with accounts data
   */
  static getAccount( email ){
    if ( ! email ) return false
      //return new Error('No email provided')
  
    const accountObj = localStorage.getItem( email.toLowerCase() );

    if ( ! accountObj ) return false;

    // If the account does exist, then return a new instane of Account
    // with that data
    return new Account(JSON.parse(accountObj))
  }

  /**
   * Verify account via email and password
   * 
   * @param  {string}   email       Email address to verify
   * @param  {string}   password    Password associated to email address
   * @return {boolean}              True if matches, false if not.
   */
  static verifyAccount({ email, password }){
    if ( ! email || ! password ) 
      return new Error('Need both email and password to login')

    let accountObj = localStorage.getItem( email.toLowerCase() );

    if ( ! accountObj ) {
      const err = new Error(`No account with the email '${email}'`)
      err.code = 404
      return err
    }

    accountObj = JSON.parse(accountObj)

    return accountObj.password === password
  }

  /**
   * Save information stored for this instance
   * 
   * @note This also works as an update
   * @return {void}
   */
  save(){
    this.#_data.phone = this.#toE164()
    localStorage.setItem(this.#_data.email.toLowerCase(), JSON.stringify(this.#_data));
    console.log('Account information for %s updated to:', this.#_data.email.toLowerCase(), this.#_data);

  }

  /**
   * Delete the localStorage object for this account
   * 
   * @return {void}
   */
  delete(){
    if ( ! this.#_data?.email ) return;
    
    console.log('Deleting localStorage for %s', this.#_data.email.toLowerCase());
    localStorage.removeItem(this.#_data.email.toLowerCase());
    this.#_data = null;
  }

  /**
   * Format number to E164 format for storage in DB
   * 
   * @param {(number|string)}   number  The phone number to 
   * @return {string}   Should be valid format
   * @examples
   *  toE164(1234567890)        // '+11234567890'
   *  toE164('11234567890')     // '+11234567890'
   *  toE164('+11234567890')    // '+11234567890'
   *  toE164('(123) 456-7890')  // '+11234567890'
   */
  #toE164(phone){
    // If none is provided, use the one in the profile.
    if ( ! phone )
      phone = this.#_data.phone
    
    // If its a number, convert it to the string to make the replacements and
    // manipulation easier.
    if ( typeof phone === 'number' )
      phone = phone.toString()

    // Remove all special characters from it...
    phone = phone.replaceAll(/[^0-9]/g, '');

    // If it only contains the 10 digits, then pepend a 1
    // for the country code
    if ( phone.length === 10 )
      phone = '1' + phone;
    
    return '+' + phone;
  }

  get data(){
    return this.#_data;
  }

  get password(){
     return this.#_data.password;
  }

  get email(){
    return this.#_data.email;
  }

  get name(){
    return this.#_data.name;
  }

  get color(){
    return this.#_data.color;
  }

  /**
   * Format number to E164 format for storage in DB
   * 
   * @param {(number|string)}   number  The phone number to 
   * @return {string}   Should be valid format
   * @examples
   *  1234567890        => '+11234567890'
   *  '11234567890'     => '+11234567890'
   *  '+11234567890'    => '+11234567890'
   *  '(123) 456-7890'  => '+11234567890'
   */
  set phone(phone){
    // If its a number, convert it to the string to make the replacements and
    // manipulation easier.
    if ( typeof phone === 'number' )
      phone = phone.toString()

    // Remove all special characters from it...
    phone = phone.replaceAll(/[^0-9]/g, '');

    // If it only contains the 10 digits, then pepend a 1
    // for the country code
    if ( phone.length === 10 )
      phone = '1' + phone;

    this.#_data.phone = '+' + phone;
  }

  /**
   * Format number for display
   * 
   * @return {string}    +1 (555) 888-2231. 
   */
  get phone() {
    const country = this.#_data.phone.substr(1, 1)
    const area = this.#_data.phone.substr(2, 3)
    const first3 = this.#_data.phone.substr(5, 3)
    const last4 = this.#_data.phone.substr(8, 4)

    return `+${country} (${area}) ${first3}-${last4}`
  }

}


