class LongMath {
    /**
     * sums two long positive numbers
     * @param a long number as string
     * @param b long number as string
     */
    static sum(a, b) {
        a = a.toString();
        b = b.toString();
        if (a.length < b.length) {
            [a, b] = [b, a];
        }
        const lengthDiff = a.length - b.length;
        b = "0".repeat(lengthDiff) + b;
        const steps = Math.ceil(a.length / 15);
        let extra = 0;
        const res = [];
        for (let i = 1; i <= steps; i++) {
            const aPart = a.slice(-15 * i, -15 * (i - 1) || undefined);
            const bPart = b.slice(-15 * i, -15 * (i - 1) || undefined);
            let sum = (+aPart + +bPart + +extra).toString();
            const lostLength = aPart.length - sum.length;
            if (lostLength > 0) {
                sum = "0".repeat(lostLength) + sum;
            }
            res.unshift(sum.slice(-15));
            extra = +(sum.length === 16);
        }
        extra && res.unshift("1");
        return res.join("");
    }

    /**
     * multiplies two long positive numbers
     * @param a long number as string
     * @param b long number as string
     */
    static mul(a, b) {
        a = a.toString();
        b = b.toString();
        if (a.length < b.length) {
            [a, b] = [b, a];
        }
        const res = [];
        const parts = Math.ceil(a.length / 15);
        for (let i = 1; i <= b.length; i++) {
            let extra = 0;
            const partSum = [];
            for (let j = 1; j <= parts; j++) {
                const aPart = a.slice(-15 * j, -15 * (j - 1) || undefined);
                const bPart = b.slice(b.length - i, b.length - i + 1);
                let partMulRes = (+aPart * +bPart + +extra).toString();
                const lostLength = aPart.length - partMulRes.length;
                if (lostLength > 0) {
                    partMulRes = "0".repeat(lostLength) + partMulRes;
                }
                partSum.unshift(partMulRes.slice(-15));
                extra = partMulRes.length === 16 ? partMulRes.slice(0, 1) : "";
            }
            extra && partSum.unshift(extra);
            res.unshift(partSum.join("") + "0".repeat(i - 1));
        }
        return res.reduce((acc, cur) => this.sum(acc, cur));
    }
}
