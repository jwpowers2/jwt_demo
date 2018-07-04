# JSON Web Tokens (sourced from tutorial text at jwt.io)

### tokens have three parts, separated by dots: header, payload, signature

1. header

    consists of the type of token (JWT) and the hashing algorithm being used

    example:
    ```
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```
    Then, this JSON is Base64Url encoded and becomes the first part of the JWT

2. payload

    contains the claims

    claims are statements about an entity(like a user) and additional data (jwt.io)

    types of claims are: registered, public, private

    * registered claims are predefined ones, like issuer (iss), expiration (exp), sub (subject), and audience(aud)

    * public claims can be defined at will but are subject to collisions, should be registered with IANA JSON web token registry

    * private claims are completely custom, used to share information between parties: not registered or public

    The payload is then Base64Url encoded to form the second part of the JSON Web Token

    The payload information is protected against tampering but readable to anyone.  Any secret data should be encrypted.

3. Signature

    To create the signature part you have to take the encoded header, the encoded payload, a secret,

    the algorithm specified in the header and sign that

    Here is an example using the HMAC SHA256 algorithm: 
    ```
    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)  
    ```
    The signature is used to verify the message wasn't changed along the way.  Tokens signed with a private key

    are used to verify that the sender of the JWT is who it says it is.

## generate key and cert
    ```
    https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9   
    ```