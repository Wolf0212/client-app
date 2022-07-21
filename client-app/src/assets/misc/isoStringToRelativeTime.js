import { DateTime } from 'luxon'

export const isoStringToRelativeTime = (isoString) =>
    DateTime.fromISO(isoString).toRelative()