import jwtDecode from "jwt-decode"
import { DateTime } from "luxon"

export function decodeJwt(data) {
    return jwtDecode(data);
}

export function parseDateToString(input) {
    return DateTime.now().toRelative + " ago";
}