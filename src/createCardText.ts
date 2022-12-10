export const createCardText = ({
  score,
  theme,
  lang
}: {
  score: Score
  theme: Theme
  lang: Lang
}): string => {
  const urlQuery = `?e=${score.eScore}&b=${score.bScore}&i=${
    score.iScore
  }&b1=${encodeURIComponent(
    theme.background.first
  )}&b2=${encodeURIComponent(
    theme.background.second
  )}&i1=${encodeURIComponent(theme.icon.first)}&i2=${encodeURIComponent(
    theme.icon.second
  )}&l=${lang}`
  return urlQuery
}
