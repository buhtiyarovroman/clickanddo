import React from 'react'
import { View } from 'react-native'

import { ListItem } from './ui'
import { styles } from './styles'
import { TPublicationsList } from './types'

export const ListTile = ({ publications }: TPublicationsList) => (
  <View style={styles.container}>
    <View style={styles.column}>
      {publications
        .filter((_, index) => index % 2 === 0)
        .map((item, index) => (
          <ListItem key={index} publication={item} />
        ))}
    </View>
    <View style={styles.column}>
      {publications
        .filter((_, index) => index % 2 === 1)
        .map((item, index) => (
          <ListItem key={index} publication={item} />
        ))}
    </View>
  </View>
)
