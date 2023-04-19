const calculateTimeIndicator = (date: string) => {
    const todayDate = new Date();
    const dateOrders = new Date(date);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    const utc2 = Date.UTC(dateOrders.getFullYear(), dateOrders.getMonth(), dateOrders.getDate());

    const dateDifference = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    const timeOrder = `${dateOrders.getHours()}:${dateOrders.getMinutes()}`
    if (dateDifference === 0) return `Сегодня, ${timeOrder}`
    if (dateDifference === 1) return `Вчера, ${timeOrder}`
    if (dateDifference >= 2) return `${dateDifference} дня назад, ${timeOrder}`
}

export default calculateTimeIndicator;