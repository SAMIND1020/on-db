import CryptoJS from "crypto-js";

export function capitalizeWithSpaces(str) {
    return str
        .replace(/_./g, (match) => " " + match[1].toUpperCase())
        .replace(/^[a-z]/, (str) => str.toUpperCase());
}

export function lowercaseWithUnderscores(str) {
    return str.toLowerCase().replace(/\s+/g, "_");
}

export function paginateArray(array, itemsPerPage, currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
}

export const getLastMonthVariation = (persons) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return persons.filter(
        (person) => new Date(person.created_at) >= thirtyDaysAgo
    ).length;
};

export const getMostRecentItem = (items, dateKey) => {
    return items.reduce((mostRecent, item) => {
        const createdAt = new Date(item[dateKey]).getTime();
        const mostRecentTime = new Date(mostRecent[dateKey]).getTime();
        return createdAt > mostRecentTime ? item : mostRecent;
    }, items[0]);
};

export const getUpcomingEvents = (events) => {
    const now = new Date();

    return events
        .filter((event) => new Date(event.init_date) > now)
        .slice(0, 4);
};

export function getUserCountByLastMonths(users) {
    const languageFormat = "default";
    const currentDate = new Date();
    const monthCounts = Array(4).fill(0);

    const lastFourMonths = [];
    for (let i = 0; i < 4; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);

        const monthName = date.toLocaleString(languageFormat, {
            month: "short",
        });
        const year = date.getFullYear();
        lastFourMonths.unshift({ month: monthName, year });
    }

    users.forEach((user) => {
        const createdAt = new Date(user.created_at);
        const userYear = createdAt.getFullYear();
        const userMonth = createdAt.toLocaleString(languageFormat, {
            month: "short",
        });

        lastFourMonths.forEach((lastMonth, index) => {
            if (lastMonth.month === userMonth && lastMonth.year === userYear)
                monthCounts[index]++;
        });
    });

    const result = lastFourMonths.map((month, index) => ({
        month: `${capitalizeWithSpaces(month.month)} ${month.year}`,
        value: monthCounts[index],
    }));

    return result;
}

export const encryptToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(
        token,
        import.meta.env.VITE_SECRET_KEY
    ).toString();

    return encryptedToken;
};

export const decryptToken = (encryptedToken) => {
    if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(
            encryptedToken,
            import.meta.env.VITE_SECRET_KEY
        );
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    return "";
};
