export class User {
    user_id?: Number;
    email: String;
    firstName: String;
    lastName: String;
    password: String;
    active?: Number;
    resetToken?: null;
    token: String;
    roles?: Number[];
    image: File;

    constructor() { }
}
