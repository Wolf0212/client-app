import jwtDecode from "jwt-decode"

export function decodeJwt(data) {
    return jwtDecode(data);
}