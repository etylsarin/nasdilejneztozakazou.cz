import * as React from "react"
import { RESOURCE_GROUPS } from "../data/resources"
import * as styles from "./resource-list.module.scss"

// Recommended outside resources, grouped by theme.
export const ResourceList = ({
  headingLevel = "h3",
}: {
  headingLevel?: "h2" | "h3"
}) => {
  const Heading = headingLevel
  return (
    <div className={styles.groups}>
      {RESOURCE_GROUPS.map(group => (
        <section key={group.title} className={styles.group}>
          <Heading className={styles.title}>{group.title}</Heading>
          <ul>
            {group.items.map(item => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noopener">
                  {item.name}
                </a>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default ResourceList
