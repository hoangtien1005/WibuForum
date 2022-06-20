import { MEDIA_CONSTANTS } from "./constants"
import moment from "moment"

const { SEASON } = MEDIA_CONSTANTS

// get the current season
export const getCurrentSeason = (d = new Date()) => {
  const seasonArray = [
    {
      value: "WINTER",
      label: "Winter",
      date: new Date(
        d.getFullYear(),
        11,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: "SPRING",
      label: "Spring",
      date: new Date(
        d.getFullYear(),
        2,
        d.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime()
    },
    {
      value: "SUMMER",
      label: "Summer",
      date: new Date(
        d.getFullYear(),
        5,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: "FALL",
      label: "Fall",
      date: new Date(
        d.getFullYear(),
        8,
        d.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime()
    }
  ]

  const season = seasonArray.filter(({ date }) => date <= d).slice(-1)[0] || {
    value: "WINTER",
    label: "Winter"
  }
  return season
}

export const getNextSeason = () => {
  const { value: currentSeason } = getCurrentSeason()

  const seasons = Object.keys(SEASON.ANIME).map((key, idx) => {
    return { value: key, label: SEASON.ANIME[key], idx }
  })
  return seasons[
    seasons.find((season) => season.value === currentSeason).idx + 1
  ]
}

export const getCurrentYear = () => {
  return new Date().getFullYear()
}

export const timeSince = (date) => {
  return moment(date).fromNow()
}

export const generateDate = ({ day, month, year }) => {
  if (!day && !month && !year) return "unknown"

  const res = []

  if (day) {
    res.push(day < 10 ? `0${day}` : day)
  }
  if (month) {
    res.push(month < 10 ? `0${month}` : month)
  }
  if (year) {
    res.push(year)
  }
  return res.join("-")
}

export const checkUsername = (value) => {
  if (!value || value.trim().length === 0) return "Username is required"
}

export const checkFullname = (value) => {
  if (!value || value.trim().length === 0) return "Full name is required"
}

export const checkPassword = (value) => {
  if (!value || value.trim().length === 0) return "Password is required"
  if (value.trim().length < 6) return "Password must be at least 6 characters"
}

export const checkDob = (value) => {
  if (!value || value.trim().length === 0) return "Date of birth is required"
  if (
    !value
      .toLowerCase()
      .match(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      )
  )
    return "Invalid date format"
}

export const checkTitle = (value) => {
  if (!value || value.trim().length === 0) return "Title is required"
}

export const checkContent = (value) => {
  if (!value || value.trim().length === 0) return "Content is required"
}
