const isShunzi2 = (arr: card[]) => {
    // 1. 按花色分组
    const huaseGroups: Record<string, card[]> = {
        'A': [],
        'B': [],
        'C': [],
        'D': []
    };
    
    // 将牌按花色分组
    arr.forEach(card => {
        huaseGroups[card.huase].push(card);
    });
    
    // 2. 检查每种花色是否有足够的牌形成顺子
    for (const huase in huaseGroups) {
        const cards = huaseGroups[huase];
        
        // 如果这个花色的牌少于5张，跳过
        if (cards.length < 5) continue;
        
        // 按值从大到小排序
        cards.sort((a, b) => b.value - a.value);
        
        // 去重
        const uniqueValues = Array.from(new Set(cards.map(card => card.value)));
        
        // 如果去重后少于5张，跳过
        if (uniqueValues.length < 5) continue;
        
        // 检查是否有顺子
        // 特殊情况：A可以作为1或者14
        const hasA = uniqueValues.includes(1);
        
        // 检查普通顺子
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            // 检查连续5张
            let isConsecutive = true;
            for (let j = 0; j < 4; j++) {
                if (uniqueValues[i + j] - uniqueValues[i + j + 1] !== 1) {
                    isConsecutive = false;
                    break;
                }
            }
            
            if (isConsecutive) return true;
        }
        
        // 检查特殊顺子：A-2-3-4-5
        if (hasA && 
            uniqueValues.includes(2) && 
            uniqueValues.includes(3) && 
            uniqueValues.includes(4) && 
            uniqueValues.includes(5)) {
            return true;
        }
        
        // 检查特殊顺子：10-J-Q-K-A
        if (hasA && 
            uniqueValues.includes(10) && 
            uniqueValues.includes(11) && 
            uniqueValues.includes(12) && 
            uniqueValues.includes(13)) {
            return true;
        }
    }
    
    return false;
}