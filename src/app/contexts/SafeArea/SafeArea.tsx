import React from 'react'
import { createContext, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TBackgroundColor, TStatusBar, TStatusBarContext } from './types'
import {
  Edge,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context'
import { EColors } from '@/shared/ui/Styled'

const DEFAULT_COLOR = EColors.white
const DEFAULT_EDGES: Edge[] = []

export const SafeAreaContext = createContext<TStatusBarContext>({
  backgroundColor: DEFAULT_COLOR,
  setBackgroundColor: () => {},
  edges: DEFAULT_EDGES,
  setEdges: () => {},
})

export const SafeAreaWrapper = ({ children }: TStatusBar) => {
  const [backgroundColor, setBackgroundColor] =
    useState<TBackgroundColor>(DEFAULT_COLOR)

  const [edges, setEdges] = useState<Edge[]>(DEFAULT_EDGES)

  const value = useMemo(
    () => ({ backgroundColor, setBackgroundColor, setEdges, edges }),
    [backgroundColor, edges],
  )

  return (
    <SafeAreaProvider>
      <SafeAreaContext.Provider value={value}>
        <SafeAreaView
          style={[
            styles.safeAreaView,
            {
              backgroundColor,
            },
          ]}
          edges={edges}>
          {children}
        </SafeAreaView>
      </SafeAreaContext.Provider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})
