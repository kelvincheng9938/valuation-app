    const onResize = () => {
      instances.forEach(instance => {
        if (instance && !instance.isDisposed()) {
          try {
            instance.resize();
          } catch (error) {
            console.error('Error resizing chart:', error);
          }
        }
      });
    };
    
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', onResize, { passive: true });

    // Return instances for external theme updates
    return instances;

  } catch (error) {
    console.error('Error initializing charts:', error);
    
    // Show error message in chart containers
    const errorElements = ['qualityRadar', 'valuationChart', 'peersChart', 'segmentPie'];
    errorElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9fb0c3;font-size:14px;">Chart loading failed</div>';
      }
    });
  }
}

// Function to update chart themes when theme changes
export function updateChartsTheme() {
  if (typeof window === 'undefined' || !echartsLib) return;
  
  const echarts = echartsLib;
  const chartElements = ['qualityRadar', 'valuationChart', 'peersChart', 'segmentPie'];
  
  chartElements.forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      const chart = echarts.getInstanceByDom(element);
      if (chart && !chart.isDisposed()) {
        const themeColors = getThemeColors();
        
        // Update chart background and colors
        chart.setOption({
          backgroundColor: themeColors.background
        }, { notMerge: false });
      }
    }
  });
}
