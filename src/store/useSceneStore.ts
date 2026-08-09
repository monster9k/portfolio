import { create } from 'zustand'
import type { SectionId } from '@/content/sections'

interface SceneState {
  hoveredId: SectionId | null
  selectedId: SectionId | null
  setHovered: (id: SectionId | null) => void
  setSelected: (id: SectionId | null) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  hoveredId: null,
  selectedId: null,
  setHovered: (id) => set({ hoveredId: id }),
  setSelected: (id) => set({ selectedId: id }),
}))
