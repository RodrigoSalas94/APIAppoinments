export type Patient = {
  firstName: string;

  lastName: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  phoneNumber: string;
  email: string;
};
