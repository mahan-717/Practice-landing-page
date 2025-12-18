function initPaymentMethodToggle() {
  const container = document.getElementById('payment-methods');
  if (!container) return;

  const options = Array.from(container.querySelectorAll('.payment-option'));
  const radios = Array.from(container.querySelectorAll('input[type="radio"][name="payment"]'));

  function setSelected(value) {
    for (const option of options) {
      const optionValue = option.getAttribute('data-value');
      const labelSpan = option.querySelector('span');
      const isSelected = optionValue === value;

      option.classList.toggle('border-2', isSelected);
      option.classList.toggle('border-teal-500', isSelected);
      option.classList.toggle('bg-teal-50', isSelected);

      option.classList.toggle('border', !isSelected);
      option.classList.toggle('border-gray-200', !isSelected);

      if (labelSpan) labelSpan.classList.toggle('font-medium', isSelected);
    }
  }

  const checked = radios.find((r) => r.checked);
  setSelected(checked ? checked.value : 'credit');

  container.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== 'payment') return;
    setSelected(target.value);
  });
}

function initRevenueChart() {
  const canvas = document.getElementById('revenueChart');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  if (typeof Chart === 'undefined') return;

  // eslint-disable-next-line no-new
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [1200000, 1350000, 1500000, 1650000, 1750000, 1876580],
          borderColor: 'rgb(20, 184, 166)',
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: { size: 14 },
          bodyFont: { size: 12 },
          displayColors: false,
          callbacks: {
            label(context) {
              return '$' + Number(context.parsed.y).toLocaleString();
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#6B7280', font: { size: 12 } },
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { display: false },
        },
      },
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPaymentMethodToggle();
  initRevenueChart();
});
