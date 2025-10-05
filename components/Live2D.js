/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isMobile, loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const showPet = JSON.parse(siteConfig('WIDGET_PET'))
  const petLink = siteConfig('WIDGET_PET_LINK')
  const petSwitchTheme = siteConfig('WIDGET_PET_SWITCH_THEME')

  useEffect(() => {
    if (showPet && !isMobile()) {
      Promise.all([
        loadExternalResource(
          'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js',
          'js'
        )
      ]).then(e => {
        if (typeof window?.loadlive2d !== 'undefined') {
          // https://github.com/xiazeyu/live2d-widget-models
          try {
            loadlive2d('live2d', petLink)
          } catch (error) {
            console.error('读取PET模型', error)
          }
        }
      })
    }
  }, [theme])

  function handleClick() {
    if (petSwitchTheme) {
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

  return (
    <canvas
      id='live2d'
      width='280'
      height='300'
      onClick={handleClick}
      className='cursor-grab'
      onMouseDown={e => e.target.classList.add('cursor-grabbing')}
      onMouseUp={e => e.target.classList.remove('cursor-grabbing')}
    />

<script>
  // 监听 live2d 的事件
function addLive2DEvents() {
  const live2dWidget = document.getElementById('live2d');
  if (!live2dWidget) {
    console.error("无法找到Live2D元素");
    return;
  }
    const tapSound = document.getElementById('tap_body');
  const hoverSound = document.getElementById('shake');
  // 检查声音元素是否存在
  if (!tapSound || !hoverSound) {
    console.error("声音元素未正确加载");
    return;
  }
  // 添加触摸和点击事件监听器以支持更多设备
  live2dWidget.addEventListener('touchend', function () {
    tapSound.play().catch(error => console.warn('无法播放点击声音:', error));
  });
  live2dWidget.addEventListener('click', function () {
    tapSound.play().catch(error => console.warn('无法播放点击声音:', error));
  });
  // 添加鼠标悬停事件
  live2dWidget.addEventListener('mouseenter', function () {
    hoverSound.play().catch(error => console.warn('无法播放悬停声音:', error));
  });
}
// 确保DOM完全加载后再执行
document.addEventListener('DOMContentLoaded', function () {
  addLive2DEvents();
})
</script>
  
  )
}
