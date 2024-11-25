import { onMounted } from "vue"


export function useOml2d() {
  const init = async () => {
    if (typeof window !== 'undefined') {
      const { loadOml2d } = await import('oh-my-live2d');
      loadOml2d({
        models: [
          {
            "path": "https://model.oml2d.com/HK416-1-normal/model.json",
            "position": [0, 60],
            "scale": 0.08,
            "stageStyle": {
              "height": 450
            }
          }
        ]
      });
    }
  }

  onMounted(() => {
    init();
  })
}