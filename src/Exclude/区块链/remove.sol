/**
 * removeLiquidity函数：移除流动性
 * -------------------------------
 * 1. 按照用户持有的流动性份额，按比例取回两种代币。
 * 2. 销毁流动性份额（burn）：
 *    用户移除流动性后，其流动性份额会被销毁，池子的储备量也要更新。
 * 3. require安全性检查：
 *    检查用户余额和取出数量是否合法，防止异常操作。
 */
function removeLiquidity(uint _liquidity) external returns (uint amount0, uint amount1) {
    // 检查用户流动性余额
    require(balanceOf[msg.sender] >= _liquidity, "Insufficient balance");
    
    // 读取当前token储备量
    uint _reserve0 = reserve0;
    uint _reserve1 = reserve1;
    
    // 计算可取出的token数量
    amount0 = (_liquidity * _reserve0) / totalLiquidity;
    amount1 = (_liquidity * _reserve1) / totalLiquidity;
    
    // 检查取出数量是否合法
    require(amount0 > 0 && amount1 > 0, "Invalid remove amounts");
    
    // 合约将token转给用户
    token0.transfer(msg.sender, amount0);
    token1.transfer(msg.sender, amount1);
    
    // 用户流动性份额减少
    balanceOf[msg.sender] -= _liquidity;
    
    // 销毁用户的流动性份额
    _burn(msg.sender, _liquidity);
    
    // 更新储备量
    _update(_reserve0 - amount0, _reserve1 - amount1);
}